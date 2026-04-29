# HunarBridge Firestore Schema

## Collections

### `artisans`
- `id`: string (UID)
- `name`: string
- `bio`: string
- `craft`: string
- `profileImage`: string
- `portfolioImages`: array<string>
- `voiceIntroUrl`: string
- `location`: object
  - `lat`: number
  - `lng`: number
  - `address`: string
  - `state`: string
  - `district`: string
- `rating`: number
- `reviewsCount`: number
- `trustScore`: number
- `verified`: boolean
- `skills`: array<object>
  - `id`: string
  - `name`: string
  - `level`: number
  - `category`: string
- `coupons`: array<string> (Refs to coupon templates)
- `joinedDate`: timestamp

### `coupons`
- `id`: string
- `title`: string
- `description`: string
- `rewardType`: enum (visibility_boost, premium_buyer, brand_connection)
- `pointsRequired`: number

### `trust_vouch`
- `id`: string
- `vouchFrom`: string (UID)
- `vouchTo`: string (UID)
- `timestamp`: timestamp

### `reviews`
- `id`: string
- `artisanId`: string (UID)
- `buyerId`: string (UID)
- `rating`: number
- `comment`: string
- `timestamp`: timestamp
