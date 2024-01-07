import asyncio


async def tcp_echo_client(message):
    reader, writer = await asyncio.open_connection("0.0.0.0", 8888)
    #'167.71.169.185', 8888)

    print(f"Send: {message!r}")
    writer.write(message.encode())

    data = await reader.read(100)
    print(f"Received: {data.decode()!r}")

    print("Close the connection")
    writer.close()


asyncio.run(tcp_echo_client("Hello World!"))
