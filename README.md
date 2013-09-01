# blag
This is a basic blogging software, based on Markdown files in the ``posts``
directory.

To create a post, create a new ``.md`` file in the ``posts`` directory.

Posts will be displayed in reverse ASCIIbetical order: so you should call the
first post ``000-foo.md``, the second ``001-bar.md``, and so on.

## Dates
You should add the publication date and time in
[RFC2822](http://tools.ietf.org/html/rfc2822#page-14) or
[ISO 8601](http://www.w3.org/TR/NOTE-datetime) format, on a line of its own,
prefixed with a ``%``.  This is necessary as many modern filesystems (for
example, ext4) do not store the file creation time.

If the date is not specified, the file modification time will be used.

## Example
```md
## Hello, world!
% 1984-04-01
This is a test post.
```
