---
id: examples
title: Examples
sidebar_label: Examples
---

## Automatic Google Maps Javascript API injection

```jsx
<GooglePlacesAutocomplete apiKey="*****" />
```


## Controlled input

```jsx
const [value, setValue] = useState(null);

<GooglePlacesAutocomplete
  selectProps={{
    value,
    onChange: setValue,
  }}
/>
```

## Customization

In order to customize the input and suggestions list, we need to use the `styles` property of [react-select](https://react-select.com/styles).

```jsx
<GooglePlacesAutocomplete
  selectProps={{
    styles: {
      input: (provided) => ({
        ...provided,
        color: 'blue',
      }),
      option: (provided) => ({
        ...provided,
        color: 'blue',
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'blue',
      }),
    },
  }}
/>
```
