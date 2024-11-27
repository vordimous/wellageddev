# wellageddev

run local:

```sh
pnpm dev
```

generate pdf:

```sh
curl --data-urlencode "markdown=$(cat content/about/index.md)" --output assets/andrew_danelz.pdf https://md-to-pdf.fly.dev
```
