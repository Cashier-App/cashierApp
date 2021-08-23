import React from "react";
import { gql, useMutation } from "@apollo/client";
const MUTATION = gql`
  mutation ($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export default function Upload() {
  const [mutate] = useMutation(MUTATION);

  function onChange({
    target: {
      validity,
      files: [file],
    },
  }) {
    console.log(file);
    if (validity.valid) mutate({ variables: { file } });
  }
  return <input type="file" required onChange={onChange} />;
}
