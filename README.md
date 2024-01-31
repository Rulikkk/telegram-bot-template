# ENV variables

Required:
- `TELEGRAM_TOKEN` - telegram bot token
- `CLOUDFLARE_ACCOUNT_ID` Set to the Cloudflare account ID for the account on which you want to deploy your Worker. [How to find account ID](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/).
- `CLOUDFLARE_API_TOKEN` [See how to create](https://developers.cloudflare.com/workers/wrangler/ci-cd/#api-token)

Optional:
- `HOST` - deployed host url, for local development (e.g. `bot.example.org`)
