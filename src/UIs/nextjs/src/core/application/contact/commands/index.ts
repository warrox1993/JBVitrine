/**
 * Contact Application - Commands
 * 
 * Contains all command handlers for Contact write operations (CQRS).
 * Commands change system state and may have side effects.
 * 
 * @module core/application/contact/commands
 */

// Export Contact commands and handlers here
export * from './submit-contact/SubmitContactCommand';
export * from './submit-contact/SubmitContactHandler';
// Example: export * from './submit-contact';
// Example: export * from './update-contact';
// Example: export * from './delete-contact';
