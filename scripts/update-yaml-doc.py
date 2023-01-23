#!/usr/bin/env python3

from ruamel.yaml import YAML
import sys
import argparse

def my_represent_none(self, data):
    return self.represent_scalar(u"tag:yaml.org,2002:null", u"null")


yaml = YAML()
yaml.representer.add_representer(type(None), my_represent_none)


def main(file, tag, path):
    data = None
    with open(file) as doc:
        data = yaml.load(doc)

    update(data, path, tag)
    with open(file, "w") as doc:
        yaml.dump(data, doc)


def update(d, path, value):
    out = path.split(".", 1)
    key = out[0]
    if len(out) > 1:
        path = out[1]
        return update(d[key], path, value)
    else:
        print(d[key], value)
        d[key] = value


parser = argparse.ArgumentParser(prog="Update YAML doc")
parser.add_argument("-f", "--file", required=True)
parser.add_argument("-v", "--value", required=True)
parser.add_argument("-p", "--path", required=True)


if __name__ == "__main__":
    args = parser.parse_args()
    main(args.file, args.value, args.path)
