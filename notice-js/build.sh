#!/bin/sh

set -o errexit

CLEANJS=../webistrano/lib/ba/cleanjs.rb
GCC=./tools/google_closure_compiler/compiler.jar
PACKER=packr
YUI=./tools/yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar

ruby $CLEANJS js/ba.js > build/ba-clean.js &&

	$PACKER -b build/ba-clean.js > build/ba-packed-min.js &&
	java -jar $GCC --compilation_level SIMPLE_OPTIMIZATIONS --js build/ba-clean.js > build/ba-closure-min.js &&
	java -jar $YUI build/ba-clean.js > build/ba-yui-min.js &&

	$PACKER -b build/ba-closure-min.js > build/ba-closure-packed-min.js &&

	gzip -c build/ba-closure-packed-min.js > build/ba-closure-packed-min.js.gz &&
	gzip -c build/ba-packed-min.js > build/ba-packed-min.js.gz &&
	gzip -c build/ba-closure-min.js > build/ba-closure-min.js.gz &&
	gzip -c build/ba-yui-min.js > build/ba-yui-min.js.gz &&

	ls -lS build/*\.js*
