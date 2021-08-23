import React from "react";
import { gql, useMutation } from "@apollo/client";
const MUTATION = gql`
  mutation addStockItem($file: Upload!) {
    singleUpload(file: $file) {
      name
      price
      category {
        name
      }
      imageUrl
      recipes {
        ingredient {
          _id
          name
          unit
          total
        }
        qty
      }
      stock
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
