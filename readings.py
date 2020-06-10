# -*- coding: utf-8 -*-
"""A python script to aid in the generation of our markdown content databases"""

# Appending to file
while True:
    # Title of Work
    title = input("Title: ")
    # Work URL
    url = input("URL: ")
    # Author(s)
    auth_num = input("Number of authors: ")
    author_string = ""
    for i in range(int(auth_num)):
        author = input("Author: ")
        author_url = input("Author URL: ")
        if i == 0:
            author_string += f"[{author}]({author_url})"
        else:
            author_string += f" and [{author}]({author_url})"
    # Summary of Work
    summary = input("Summary: ")
    summary_source = input("Summary souce (Taken from source): ")
    if summary_source == "":
        summary_source = "(Taken from source)"
    else:
        ss_url = input("Summary source URL: ")
        summary_source = f"[Summary c/o {summary_source}]({ss_url})"
    got_it_from = input("Got it from: ")
    # Entry string
    entry = f"- [**{title}**]({url}) {{{got_it_from}}}\n\t- Authored by {author_string}\n\t- \"{summary}\" {summary_source}\n\n"
    # Write to disk
    with open("readings_python.md", "a") as f:
        f.write(entry)
    # New line for readability
    print()
