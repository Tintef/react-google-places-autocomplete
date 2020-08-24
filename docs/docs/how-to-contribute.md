---
id: how-to-contribute
title: How to contribute?
sidebar_label: How to contribute?
---

1. Fork this repo
2. Clone your fork
3. Code 🤓
4. Test your changes

    For this, I like to use [yalc](https://github.com/whitecolor/yalc), as it allows to emulate the process of using npm/yarn.

    1. Install [yalc](https://github.com/whitecolor/yalc)
    2. Build project with `yarn build` or `npm run build`
    3. Publish the package with yalc: `yalc publish`
    4. Add the package to your test project `yalc add react-google-places-automocomplete`
    5. If needed, to update the package on your test project: `yalc update react-google-places-autocomplete`


5. Submit a PR!
