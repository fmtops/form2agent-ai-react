import { Field, FieldAttributes } from "formik";

export default function StyledField({
  className,
  ...rest
}: FieldAttributes<any>) {
  return (
    <Field
      className={`p-2.5 px-3 rounded-md border-[#C1C6CF] border-[1px] bg-white text-black
       ${className}`}
      {...rest}
    />
  );
}
