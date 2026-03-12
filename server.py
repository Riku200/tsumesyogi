import http.server
import socketserver

PORT = 8080

class AI_ServerHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # ここでAIを動かすための「特別な許可証」を確実に発行します
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        super().end_headers()

with socketserver.TCPServer(("", PORT), AI_ServerHandler) as httpd:
    print(f"AI対応サーバーが起動しました！ => http://localhost:{PORT}")
    print("この画面は開いたままにしてください。終了するには Ctrl+C を押します。")
    httpd.serve_forever()