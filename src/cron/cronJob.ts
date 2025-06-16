import { getPendingUsers } from "../utils/cronHelpers";
import { User, FailedUser } from "../types/types";
import { issueBadge } from "./issueBadge";

export async function processPendingUsers(env: any): Promise<void> {
  const BATCH_SIZE = 10;
  
  try {
    // Get pending users
    const pendingUsers = await getPendingUsers(env);
    
    if (pendingUsers.length === 0) {
      console.log('No pending users to process');
      return;
    }
    
    // Process in batches
    const allFailedUsers: FailedUser[] = [];
    
    for (let i = 0; i < pendingUsers.length; i += BATCH_SIZE) {
      const batch = pendingUsers.slice(i, i + BATCH_SIZE);
      const batchFailures = await processBatch(batch, env);
      allFailedUsers.push(...batchFailures);
    }
    
    // Handle any failures
    if (allFailedUsers.length > 0) {
      //send slack notification
      console.log("send slack notification")
    }
    
  } catch (error: any) {
    //send slack notification
    console.error('Critical error in user processing:', error);
  }
}

async function processBatch(batch: User[], env: any): Promise<FailedUser[]> {

  const responses = await Promise.all(
    batch.map(user => issueBadge(user.email, user.name, env))
  );

  const successfulUsers: User[] = [];
  const failedUsers: FailedUser[] = [];

  batch.forEach((user, index) => {
    const response: any = responses[index];
    
    if (response.status.success) {
      successfulUsers.push(user);
    } else {
      failedUsers.push({
        ...user,
        error: response.statusText || 'Unknown error'
      });
    }
  });

  // Update successful users
  if (successfulUsers.length > 0) {
    const placeholders = successfulUsers.map(() => '?').join(',');
    const userIds = successfulUsers.map(user => user.id);
    
    await env.DB
      .prepare(`UPDATE users SET badge_received = ? WHERE id IN (${placeholders})`)
      .bind(true, ...userIds)
      .run();
      
    console.log(`✅ Successfully processed ${successfulUsers.length} certificates`);
  }

  // Log failures
  failedUsers.forEach(user => {
    console.error(`❌ Failed to issue badge to ${user.email}: ${user.error}`);
  });

  return failedUsers;
}
