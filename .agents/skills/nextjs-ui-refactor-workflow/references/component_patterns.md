# Next.js & React Component Engineering Patterns

Reference templates for avoiding hydration/SSR pitfalls, stacking-context clipping, and external API rate-limit failures during UI refactors.

---

## 1. Hydration-Safe Above-the-Fold Hero Images

**Anti-Pattern (Do Not Use)**:
```tsx
// BAD: If the browser loads /avatar.jpg from cache before React finishes
// hydrating, onLoad never triggers and the image stays at opacity: 0 forever.
const [loaded, setLoaded] = useState(false);
<img
  src="/avatar.jpg"
  onLoad={() => setLoaded(true)}
  style={{ opacity: loaded ? 1 : 0 }}
/>
```

**Recommended Pattern**:
```tsx
// GOOD: Renders immediately on first paint with high fetch priority.
<img
  src="/avatar.jpg"
  alt="Subject Portrait"
  fetchPriority="high"
  loading="eager"
  decoding="sync"
  className="w-full h-full object-cover object-top"
/>
```

---

## 2. Stacking-Context-Safe Lightboxes (`createPortal`)

When parent sections use GSAP (`filter: blur(...)`, `transform`) or `overflow: hidden`, any child `position: fixed` modal will be clipped inside that parent's stacking context. Always portal modals to `document.body`:

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export function PortalLightbox({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full z-[100000]"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
```

---

## 3. Three-Tier Resilient Client Fetching (`localStorage` TTL + Live API + Curated Fallback)

When building portfolio or dashboard widgets backed by public unauthenticated APIs (such as GitHub's REST API, which caps unauthenticated clients at 60 req/hr):

1. **Initialize state with `CURATED_FALLBACK`** so SSR and first paint are instant (zero layout shift or empty skeleton flash).
2. **Check `localStorage` with a 1-hour TTL** before hitting the network.
3. **Gracefully retain `CURATED_FALLBACK`** on HTTP 403/429 or offline states.
