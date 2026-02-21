export interface QueuePort {
  enqueue<T>(name: string, payload: T): Promise<void>;
}
