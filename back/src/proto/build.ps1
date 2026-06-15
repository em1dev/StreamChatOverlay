PROTO_DIR=./proto

# Generate JavaScript code
pnpm run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:./src/proto \
    --grpc_out=./src/prot \
    --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
    -I ./proto \
    proto/*.proto

# Generate TypeScript code (d.ts)
pnpm run grpc_tools_node_protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=${PROTO_DIR} \
    -I ./proto \
    proto/*.proto
