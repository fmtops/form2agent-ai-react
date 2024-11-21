import { Field, FieldAttributes } from "formik";

export default function StyledField({
  className,
  ...rest
}: FieldAttributes<any>) {
  return (
    <Field
      className={`p-2.5 px-3 rounded-md border-bg-active-light border-[1px] bg-white text-black hover:border-border-primary-light
       ${className}`}
      {...rest}
      style={{
        ...rest.style,
        backgroundColor: rest.readOnly ? "#F5F7FA" : undefined,
      }}
    />
  );
}
