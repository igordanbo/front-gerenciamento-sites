export default function cleanDomain(url) {
  return url
    .replace(/^https?:\/\//, "") // remove https:// ou http://
    .replace(/\/.*$/, ""); // remove tudo após a /
}
