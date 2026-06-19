# colorpicker-ui

Minimal color picker component for React with HSL and hex conversion utilities.

## Install

```bash
npm install colorpicker-ui
```

## Usage

```jsx
import { ColorPicker, hexToHsl, hslToHex } from 'colorpicker-ui';

function App() {
  const [color, setColor] = useState('#ff6600');

  return (
    <div>
      <ColorPicker value={color} onChange={setColor} />
      <p>HSL: {JSON.stringify(hexToHsl(color))}</p>
    </div>
  );
}
```

## API

### `<ColorPicker value onChange />`

A controlled color input component.

### `hexToHsl(hex: string): { h, s, l }`

Convert hex color to HSL values.

### `hslToHex(h, s, l): string`

Convert HSL values to hex color string.
