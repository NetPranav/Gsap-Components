## 🎛️ Props API Reference

The component accepts all standard HTML button attributes (like `disabled`, `type`, `aria-label`, etc.) along with the following custom props:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`text`** | `string` | `"Button"` | The label displayed inside the button. Optional. |
| **`size`** | `"sm" \| "md" \| "lg"` | `"md"` | Controls the padding and font size. |
| **`variant`** | `"primary" \| "secondary" \| "outline"` | `"primary"` | Defines the core visual style of the button. |
| **`animation`** | `"scale" \| "glow" \| "bounce" \| "none"` | `"scale"` | The GSAP interactive effect triggered on hover or click. |
| **`theme`** | `"light" \| "dark"` | `"light"` | Adapts the default Zinc color palette for light or dark backgrounds. |
| **`className`** | `string` | `""` | Custom Tailwind classes. Added at the end to override default styles easily. |
| **`onClick`** | `() => void` | `undefined` | Standard React click handler. |

---