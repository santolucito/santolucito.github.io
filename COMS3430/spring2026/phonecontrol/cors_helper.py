import aiohttp_cors

def enableCORS(app):
  # Configure default CORS settings.
  cors = aiohttp_cors.setup(app, defaults={
      "*": aiohttp_cors.ResourceOptions(
              allow_credentials=True,
              expose_headers="*",
              allow_headers="*",
          )
  })

  # Configure CORS on all routes.
  for route in list(app.router.routes()):
      cors.add(route)