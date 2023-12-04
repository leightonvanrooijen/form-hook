'use client';
import {Path, useForm, UseFormProps} from 'react-hook-form';
import {forwardRef, useEffect} from 'react';

/**
 * Requirements
 * - Error messages
 * - Assistive text
 * - Form state can be persisted and submitted
 */
const useExtendedForm = <T extends Record<string, any>, TContext = any>(props: UseFormProps<T, TContext>) => {
  const form = useForm<T, TContext>(props);
  const register = (name: Path<T>, props: any & { label: string }) => {
    return {...form.register(name, props), label: 'Text Input Label'};
  };
  return {
    ...form,
    formState: {...form.formState, errors: form.formState.errors, helpers: {form: 'Helper text'}},
    register
  };
};
export default function Home() {
  const {register, handleSubmit, formState: {errors, helpers}} = useExtendedForm<{ form: string }>({
    defaultValues: {
      form: 'default value',
    },
  });


  return (
    <main>
      <form onSubmit={handleSubmit((data) => console.log(data))}
            className="flex min-h-screen flex-col p-24">
        <p></p>
        <FormItem {...register('form', {required: {value: true, message: 'Error message'}})} helper={helpers.form}
                  error={errors.form?.message}/>
      </form>
    </main>
  );
}

// eslint-disable-next-line react/display-name
const FormItem = forwardRef<any, any>(({onChange, onBlur, label, error, helper, name}, ref) => {
  return (
    <><p className="text-blue-500">{label}</p>
      <input type="text" className="border border-gray-300 rounded-md p-4 font-black text-black"
             placeholder="Enter your name" onChange={onChange} onBlur={onBlur} name={name} ref={ref}/>
      {error && <span className="text-red-500">{error}</span>}
      {(helper && !error) && <span className="text-blue-500">{helper}</span>}</>
  );
});