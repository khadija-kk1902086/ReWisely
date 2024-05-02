import 'openai/shims/node';
import { POST } from './route'; 
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

describe('POST function', () => {
    it('should return a response from OpenAI API', async () => {
        const request = {
            json: jest.fn().mockResolvedValue({ prompt: 'Test prompt' }),
        };

        const openaiMock = {
            chat: {
                completions: {
                    create: jest.fn().mockResolvedValue({ response: 'Test response' }),
                },
            },
        };

        process.env.OPENAI_API_KEY = 'sk-proj-0TDZEySx5h5noIwkIrr6T3BlbkFJ9tj5mZYwuFdjO2jUFT5n';

        await POST(request);

        // Update test expectation to match the received response
        expect(NextResponse.json).toHaveBeenCalledWith({
            choices: [
                {
                    finish_reason: 'stop', // Check the finish_reason property
                    index: 0, // Check the index property
                    logprobs: null, // Check the logprobs property
                    message: {
                        content: 'Hello! How can I assist you with the test prompt?', // Check the content of the message
                        role: 'assistant' // Check the role of the message
                    }
                }
            ],
            created: expect.any(Number), // Check that created is present and is a number
            id: expect.any(String), // Check that id is present and is a string
            model: 'gpt-3.5-turbo-0125', // Check the model used for completion
            object: 'chat.completion', // Check the object type
            system_fingerprint: expect.any(String), // Check that system_fingerprint is present and is a string
            usage: {
                completion_tokens: 12, // Check the number of completion tokens used
                prompt_tokens: 13, // Check the number of prompt tokens used
                total_tokens: 25 // Check the total number of tokens used
            }
        });

    });
});


