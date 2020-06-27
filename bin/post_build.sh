#!/usr/bin/env bash
echo "Deleting empty files"
find dist -type f -empty -delete
