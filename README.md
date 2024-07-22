# Vue TestID Directive

A Vue directive for easily setting `data-testid` attributes in complex nested DOM structures. This library supports advanced selectors, multiple elements, and iterator-based setting.

## Installation

```bash
npm install @chronicstone/vue-testid
```

## Usage

Import and use the directive in components, or install it globally. Then, use it on any element to control its testId.

```vue
<script setup lang="ts">
import { vTestid } from '@chronicstone/vue-testid'
</script>

<template>
  <div v-testid="some-test-id">
    ...
  </div>
</template>
```

## Examples

### Basic Usage

Set a simple `data-testid` on the element:

```vue
<template>
  <div v-testid="'my-element'">Content</div>
</template>
```

Result:
```html
<div data-testid="my-element">Content</div>
```

### Targeting a Child Element

Set `data-testid` on a child element using a selector:

```vue
<template>
  <div v-testid="{ value: 'child-button', selector: 'button' }">
    <button>Click me</button>
  </div>
</template>
```

Result:
```html
<div>
  <button data-testid="child-button">Click me</button>
</div>
```

### Multiple Elements

Set `data-testid` on multiple elements using an array:

```vue
<template>
  <div v-testid="[
    'parent-div',
    { value: 'first-paragraph', selector: 'p:first-child' },
    { value: 'second-paragraph', selector: 'p:last-child' }
  ]">
    <p>First paragraph</p>
    <p>Second paragraph</p>
  </div>
</template>
```

Result:
```html
<div data-testid="parent-div">
  <p data-testid="first-paragraph">First paragraph</p>
  <p data-testid="second-paragraph">Second paragraph</p>
</div>
```

### Dynamic Multiple Elements

Set `data-testid` on multiple elements with dynamic values:

```vue
<template>
  <ul v-testid="{
    multiple: true,
    selector: 'li',
    value: (index) => `list-item-${index + 1}`
  }">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</template>
```

Result:
```html
<ul>
  <li data-testid="list-item-1">Item 1</li>
  <li data-testid="list-item-2">Item 2</li>
  <li data-testid="list-item-3">Item 3</li>
</ul>
```

### Targeting Parent Scope

Set `data-testid` on elements outside the current component:

```vue
<template>
  <div v-testid="{
    value: 'external-element',
    selector: '#external-div',
    parentScope: true
  }">
    Internal content
  </div>
</template>
```

This will set the `data-testid` on an element with id `external-div` that exists outside the current component's scope.

## API

The `v-testid` directive accepts the following types:

1. `string`: Simple test ID
2. `Object`:
   - `value: string`: The test ID to set
   - `selector: string`: CSS selector for the target element
   - `parentScope?: boolean`: Whether to search in the parent scope (document)
3. `Object` for multiple elements:
   - `multiple: true`
   - `value: (index: number) => string`: Function to generate test IDs
   - `selector: string`: CSS selector for target elements
   - `parentScope?: boolean`: Whether to search in the parent scope
4. `Array` of any combination of the above types

## License

MIT
```
