import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 64, fontWeight: 900, letterSpacing: 2 }}>
          MJB
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 10,
            width: 76,
            height: 8,
            background: "#003087",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
