import asyncio
import aiohttp
import json
import os
import random
import time

# Configuration Variables
API_KEY = 'your_openai_api_key_here'  # Replace with your OpenAI API key
MODEL_NAME = 'gpt-o1-mini'  # Specify the model name
OUTPUT_FILE = 'training_data.jsonl'  # Output JSONL file name
NUM_EXAMPLES = 150  # Total number of training examples to generate
CONCURRENT_REQUESTS = 10  # Maximum number of concurrent API requests
RETRY_LIMIT = 3  # Number of retries for failed requests
BACKOFF_FACTOR = 2  # Exponential backoff factor

# Guidance Prompt for Dynamic User Requests
GUIDANCE_PROMPT = (
    "Generate a diverse set of user requests for an advanced AI assistant. "
    "Requests should cover various domains such as marketing, finance, technology, "
    "healthcare, education, and more. Each request should be a complex task that "
    "an executive or professional might ask, requiring detailed analysis, planning, "
    "or creative solutions."
)

# Semaphore to limit concurrent requests
semaphore = asyncio.Semaphore(CONCURRENT_REQUESTS)

async def generate_user_requests(session, num_requests):
    user_requests = []
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {API_KEY}',
    }
    data = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are an assistant that generates user prompts."},
            {"role": "user", "content": GUIDANCE_PROMPT}
        ],
        "max_tokens": 200,
        "temperature": 0.8,
        "n": num_requests,
        "stop": None,
    }

    for attempt in range(1, RETRY_LIMIT + 1):
        try:
            async with semaphore:
                async with session.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data) as response:
                    if response.status == 200:
                        result = await response.json()
                        for choice in result['choices']:
                            prompt = choice['message']['content'].strip()
                            user_requests.append(prompt)
                        return user_requests
                    else:
                        error_message = await response.text()
                        print(f"Error generating user requests: {response.status} - {error_message}")
                        if attempt == RETRY_LIMIT:
                            return []
        except Exception as e:
            print(f"Exception on attempt {attempt} while generating user requests: {e}")
            if attempt == RETRY_LIMIT:
                return []
        await asyncio.sleep(BACKOFF_FACTOR ** attempt)  # Exponential backoff
    return []

async def fetch_response(session, prompt):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {API_KEY}',
    }
    data = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are an advanced, multi-modal autonomous AI agent with exceptional capabilities."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 500,  # Adjust based on desired response length
        "temperature": 0.7,
    }

    for attempt in range(1, RETRY_LIMIT + 1):
        try:
            async with semaphore:
                async with session.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data) as response:
                    if response.status == 200:
                        result = await response.json()
                        assistant_content = result['choices'][0]['message']['content'].strip()
                        return assistant_content
                    else:
                        error_message = await response.text()
                        print(f"Error {response.status}: {error_message}")
                        if attempt == RETRY_LIMIT:
                            return f"Error: {response.status} - {error_message}"
        except Exception as e:
            print(f"Exception on attempt {attempt} for prompt '{prompt}': {e}")
            if attempt == RETRY_LIMIT:
                return f"Exception: {e}"
        await asyncio.sleep(BACKOFF_FACTOR ** attempt)  # Exponential backoff

async def generate_training_example(session, prompt):
    assistant_response = await fetch_response(session, prompt)
    training_example = {
        "messages": [
            {"role": "system", "content": "You are an advanced, multi-modal autonomous AI agent with exceptional capabilities."},
            {"role": "user", "content": prompt},
            {"role": "assistant", "content": assistant_response}
        ]
    }
    return training_example

async def main():
    async with aiohttp.ClientSession() as session:
        # Generate dynamic user requests
        print("Generating dynamic user requests...")
        user_requests = await generate_user_requests(session, NUM_EXAMPLES)

        # Ensure we have the desired number of user requests
        if len(user_requests) < NUM_EXAMPLES:
            print(f"Only generated {len(user_requests)} user requests. Adjusting the number of examples.")
            adjusted_num_examples = len(user_requests)
        else:
            adjusted_num_examples = NUM_EXAMPLES

        tasks = []
        for prompt in user_requests[:adjusted_num_examples]:
            task = asyncio.create_task(generate_training_example(session, prompt))
            tasks.append(task)
        
        training_data = []
        for idx, task in enumerate(asyncio.as_completed(tasks), 1):
            example = await task
            training_data.append(example)
            print(f"Generated example {idx}/{adjusted_num_examples}")
        
        # Write to JSONL file
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            for example in training_data:
                json_line = json.dumps(example, ensure_ascii=False)
                f.write(json_line + '\n')
        
        print(f"Training data generation complete. Saved to {OUTPUT_FILE}")

# Run the async main function
if __name__ == "__main__":
    start_time = time.time()
    asyncio.run(main())
    end_time = time.time()
    print(f"Total time taken: {end_time - start_time:.2f} seconds")
