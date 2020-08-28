---
id: v2-to-v3
title: Migrate to v3
sidebar_label: Migrate to v3
---

If you are coming from v2 and wish to start using v3, here's a comprehensive list of the deprecated props and how to replace them.

## `disabled`

```jsx
<GooglePlacesAutocomplete
  selectProps={{ isDisabled: true }}
/>
```


## `displayFromSuggestionSelected`

```jsx
<GooglePlacesAutocomplete
  selectProps={{
    getOptionLabel: (option) => string
  }}
/>
```


## `idPrefix`

This prop was used in order to allow multiple instances on the component rendered on the same page. Starting on v3, there's no more need for this prop, but if you need to pass an specific `id`, you can do:

```jsx
<GooglePlacesAutocomplete
  selectProps={{
    innerProps: {
      id: 'your-id' // string
      ...,
    },
  }}
/>
```


## `initialValue`

[React-select](https://react-select.com) provides a handful of ways to handle this. Refer to [their docs](https://react-select.com/props#statemanager-props) to find the way that best suites your use case.

## `inputClassName`, `inputStyle`, `suggestionsClassNames` and `suggestionsStyles`

[React-select](https://react-select.com) provides an easy way to customize the select, refer to [their docs](https://react-select.com/tylesrops#statemanager-props).

## `loader`, `renderInput` and `renderSuggestions`

Again, [react-select](https://react-select.com) provides an easy way to use custom components, refer to [their docs](https://react-select.com/props#replacing-components).

## `onSelect`

```jsx
<GooglePlacesAutocomplete
  selectProps={{ onChange: (object | object[] | null | undefined, action) => undefined }}
/>
```


## `placeholder`

```jsx
<GooglePlacesAutocomplete
  selectProps={{
    placeholder: 'Placeholder...',
  }}
/>
```
