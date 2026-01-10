interface DiscordWebhookPayload {
  content?: string;
  embeds?: {
    title?: string;
    description?: string;
    color?: number;
    fields?: {
      name: string;
      value: string;
      inline?: boolean;
    }[];
    timestamp?: string;
    footer?: {
      text: string;
    };
  }[];
}

export async function sendDiscordNotification(
  name: string,
  phone: string,
  message: string
): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Discord webhook URL not configured');
    return false;
  }

  const payload: DiscordWebhookPayload = {
    embeds: [
      {
        title: '새로운 상담 문의가 접수되었습니다!',
        color: 0xFF6B35,
        fields: [
          {
            name: '이름',
            value: name,
            inline: true,
          },
          {
            name: '연락처',
            value: phone,
            inline: true,
          },
          {
            name: '상담 문의 내용',
            value: message || '(내용 없음)',
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: '푸드득 - 푸드로 득하다',
        },
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
    return false;
  }
}
