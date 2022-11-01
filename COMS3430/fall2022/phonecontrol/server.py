import asyncio
from aiohttp import web
from aiohttp.web import Response
from aiohttp_sse import sse_response

from cors_helper import enableCORS

last_message = ""


async def handle_echo(reader, writer):
    global last_message
    while True:
        data = await reader.read(1000)  # num of bytes to read - just make it big enough
        message = data.decode()
        last_message = message
        addr = writer.get_extra_info("peername")
        if message == "":
            writer.close()
            break
        # else:
        # print(f"Received {message!r} from {addr!r}")


async def main():
    server = await asyncio.start_server(handle_echo, "", 8888)

    addrs = ", ".join(str(sock.getsockname()) for sock in server.sockets)
    print(f"Serving on {addrs}")

    app = web.Application()
    app.router.add_route("GET", "/", index)
    enableCORS(app)
    return app


async def index(request):
    global last_message
    loop = request.app.loop
    async with sse_response(request) as resp:
        while True:
            data = last_message
            # print(data)
            await resp.send(data)
            await asyncio.sleep(0.5)
    return resp


web.run_app(main(), port=8889)