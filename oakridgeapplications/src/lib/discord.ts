export async function notifyDiscordWebhook(departmentName: string, applicantName: string, applicationId: string) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return;

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [
        {
          title: 'New Application Submitted',
          color: 0x6366f1,
          fields: [
            { name: 'Department', value: departmentName, inline: true },
            { name: 'Applicant', value: applicantName, inline: true },
            { name: 'Application', value: applicationId, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });
}
