# Subscription Type System

This directory contains TypeScript type definitions for the subscription management system.

## Types

### `Subscription`

The main interface representing a subscription object.

```typescript
interface Subscription {
  id: number;
  name: string;
  brand: string;
  price: string;
  category: string;
  description: string;
}
```

**Fields:**

- `id`: Unique identifier for the subscription
- `name`: Name of the subscription service (e.g., "Netflix")
- `brand`: Brand or company name (e.g., "Netflix Inc.")
- `price`: Monthly price in USD as a string (e.g., "9.99")
- `category`: Category of the service (e.g., "Entertainment", "Music")
- `description`: Brief description of the subscription service

### `SubscriptionFormData`

Type for form data when creating a new subscription. Omits the `id` field since it's auto-generated.

```typescript
type SubscriptionFormData = Omit<Subscription, "id">;
```

**Usage:**

```typescript
const formData: SubscriptionFormData = {
  name: "Netflix",
  brand: "Netflix Inc.",
  price: "9.99",
  category: "Entertainment",
  description: "Streaming service for movies and TV shows",
};
```

### `SubscriptionUpdate`

Type for partial updates to an existing subscription. Requires `id` but all other fields are optional.

```typescript
type SubscriptionUpdate = Partial<Omit<Subscription, "id">> & {
  id: number;
};
```

**Usage:**

```typescript
const update: SubscriptionUpdate = {
  id: 1,
  price: "12.99", // Only updating the price
};
```

## Usage Examples

### In Components

```typescript
import { Subscription } from "@/types/subscription";

function SubscriptionCard({ subscription }: { subscription: Subscription }) {
  return (
    <div>
      <h2>{subscription.name}</h2>
      <p>${subscription.price}/month</p>
    </div>
  );
}
```

### In Arrays

```typescript
import { Subscription } from "@/types/subscription";

const subscriptions: Subscription[] = [
  {
    id: 1,
    name: "Netflix",
    brand: "Netflix Inc.",
    price: "9.99",
    category: "Entertainment",
    description: "Streaming service",
  },
];
```

### In Forms

```typescript
import { SubscriptionFormData } from "@/types/subscription";

function handleSubmit(data: SubscriptionFormData) {
  // Process form data
  console.log(data);
}
```
