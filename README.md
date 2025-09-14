# cSIM SDK

A TypeScript SDK for integrating cSIM's TOTP (Time-based One-Time Password) authorization system into your applications.

## Overview

The cSIM SDK provides a simple and secure way to implement phone number verification using TOTP in your TypeScript/JavaScript applications. It offers a clean API for requesting and validating TOTP authorizations, with built-in TypeScript type definitions for improved development experience.

### Key Features

- TOTP-based phone number verification
- TypeScript support with full type definitions
- Promise-based API
- Built-in error handling
- Axios-based HTTP client
- Minimal dependencies

## Roadmap

The following roadmap outlines the next implementation steps for enhanced cSIM SDK functionality:

### Phase 1: Contract Integration
- [ ] **Contract Address Resolution**
  - [ ] SDK retrieves contract addresses by ChainSIM number from cSIM database
  - [ ] Implement mapping between ChainSIM identifiers and TON blockchain contracts

### Phase 2: TON Blockchain Integration
- [ ] **Public Key Retrieval**
  - [ ] SDK makes RPC requests to TON network
  - [ ] Implement `get_public_key` method calls to `nft_item` contracts
  - [ ] Handle TON RPC responses and error scenarios

### Phase 3: Enhanced Messaging System
- [ ] **Custom Message Support**
  - [ ] Implement `sendMessage()` method in SDK
  - [ ] Allow providers to specify custom SMS text content
  - [ ] Enable provider-controlled TOTP generation and validation
  - [ ] Support flexible message formatting and localization

### Phase 4: End-to-End Encryption
- [ ] **Message Encryption**
  - [ ] Implement message encryption using retrieved public keys
  - [ ] Ensure only end users and providers can decrypt message content
  - [ ] Maintain zero-knowledge architecture where cSIM bridge cannot read message contents

### Phase 5: Bridge Integration
- [ ] **Encrypted Message Transmission**
  - [ ] SDK sends encrypted messages to cSIM bridge
  - [ ] Bridge forwards encrypted content without decryption capabilities
  - [ ] Maintain privacy and security throughout the transmission process

### Phase 6: Blockchain Transaction Processing
- [ ] **TON Network Transactions**
  - [ ] Bridge creates and sends transactions to `nft_item` addresses
  - [ ] Encrypted messages are sent on TON blockchain and can be seen in ChainSIM App

### Phase 7: Indexing and Frontend Support
- [ ] **Message Indexing**
  - [ ] Implement indexer to capture blockchain messages
  - [ ] Store encrypted messages in database for frontend accessibility
  - [ ] Provide convenient APIs for message retrieval and display
  - [ ] Maintain message history and audit trails

This roadmap ensures a secure, decentralized messaging system where privacy is maintained end-to-end, with cSIM acting as a trusted bridge without access to message contents.

## System Requirements

- Node.js 14.x or higher
- TypeScript 4.x or higher (for TypeScript projects)

## Installation

Install the package using npm:

```bash
npm install @chainsim/sdk
```

Or using yarn:

```bash
yarn add @chainsim/sdk
```

## Configuration

To use the SDK, you'll need:
- A Provider ID from cSIM
- An API Key from cSIM

Create a new client instance with your credentials:

```typescript
import csim from '@chainsim/sdk';

const client = csim.create({
  providerId: 'your-provider-id',
  apiKey: 'your-api-key'
});
```

## Usage

### Basic Example

```typescript
import csim from '@chainsim/sdk';

// Initialize the client
const client = csim.create({
  providerId: 'your-provider-id',
  apiKey: 'your-api-key'
});

// Request TOTP authorization
await client.requestTotpAuthorization({
  phoneNumber: '+1234567890'
});

// Validate TOTP code
const result = await client.validateTotpAuthorization({
  phoneNumber: '+1234567890',
  code: '123456'
});

console.log('Validation result:', result);
```

### Advanced Usage

Handle validation results and errors:

```typescript
import { CSimClient, CSimException } from '@chainsim/sdk';

try {
  const client = new CSimClient({
    providerId: 'your-provider-id',
    apiKey: 'your-api-key'
  });

  const result = await client.validateTotpAuthorization({
    phoneNumber: '+1234567890',
    code: '123456'
  });

  // Access validated user and number details
  const { user, number } = result;
  console.log('User address:', user.address);
  console.log('Contract address:', number.contract_address);
} catch (error) {
  if (error instanceof CSimException) {
    console.error('cSIM error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## API Documentation

### CSimClient

#### Constructor

```typescript
new CSimClient(config: CSimClientConfig)
```

Configuration options:
- `providerId` (string): Your cSIM provider ID
- `apiKey` (string): Your cSIM API key

#### Methods

##### requestTotpAuthorization

```typescript
requestTotpAuthorization(params: RequestTotpAuthorizationParams): Promise<void>
```

Parameters:
- `phoneNumber` (string): The phone number to verify

##### validateTotpAuthorization

```typescript
validateTotpAuthorization(params: ValidateTotpAuthorizationParams): Promise<ValidateTotpAuthorizationResult>
```

Parameters:
- `phoneNumber` (string): The phone number being verified
- `code` (string): The TOTP code received by the user

Returns:
- `number`: Object containing the phone number details
  - `number` (string): The verified phone number
  - `contract_address` (string): Associated contract address
- `user`: Object containing user details
  - `address` (string): User's address

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify your Provider ID and API Key are correct
   - Ensure you're using the latest SDK version
   - Check if your API key has the necessary permissions

2. **Invalid Phone Numbers**
   - Ensure phone numbers are in E.164 format (e.g., +1234567890)
   - Include the country code
   - Remove any special characters or spaces

3. **TOTP Validation Failures**
   - Verify the code hasn't expired
   - Ensure the code matches exactly what was received
   - Check if the phone number matches the one used in the request

### Error Handling

The SDK uses custom exceptions for different error scenarios:

```typescript
try {
  // SDK operations
} catch (error) {
  if (error instanceof BadRequestException) {
    // Handle invalid request parameters
  } else if (error instanceof UnauthorizedException) {
    // Handle authentication issues
  } else if (error instanceof CSimException) {
    // Handle other cSIM-specific errors
  }
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your PR:
- Includes tests for new functionality
- Updates documentation as needed
- Follows the existing code style
- Includes a clear description of the changes

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:
- Visit our website: [https://chainsim.io](https://chainsim.io)
- Check our documentation
- Contact our support team

For bug reports and feature requests, please open an issue on our GitHub repository.
