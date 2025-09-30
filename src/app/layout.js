// src/app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Bike 3D Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Explore a 3D bike model with interactive controls" />
      </head>
      <body style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}