
import "./globals.css";



export const metadata = {
  title: "Restaurant",
  description: "A food ordering app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-new.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
