import cn from 'classnames';

interface Props {
  error?: string;
  className?: string;
}

export function FieldError(props: Props) {
  const { error, className } = props;

  return <p className={cn(className, 'min-h-5 font-rubik text-sm text-error-500')}>{error}</p>;
}
