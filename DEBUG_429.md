# Contact Page 429 Debug Summary

## Routes Getting 429 Errors

Based on user logs:

- `/api/csrf/token` - HAS NO RATE LIMIT IN CODE
- `/api/leadScoring/enrich` - Uses `enrichmentLimiter` (60/min)
- `/api/leadScoring/leads` - HAS NO RATE LIMIT IN CODE
- `/api/leadScoring/events` - HAS NO RATE LIMIT IN CODE (disabled behavioral flush)
- `/api/quote` - Uses `quoteLimiter` (20/hour)

## Critical Discovery

Routes WITHOUT rate limiting in their code are returning 429.
This means:

1. Either Vercel has global limits we can't control
2. OR there's a middleware/config we haven't found
3. OR Upstash has a global limit per IP despite low usage (17/500k commands)

## Next Action

TEMPORARILY DISABLE ALL RATE LIMITERS to isolate the problem.
If 429s persist, it's NOT our code - it's Vercel or network level.
