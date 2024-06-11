import { generateClasses, parseClasses } from "@/scripts/tools/utils";

interface Props extends SelectHTML {
  children: any
  className?: string
  variant?: ('label-inline' | 'label-space-between' | 'label-full-width' | 'label-stack' | 'large')[]
  label?: string
}


export default function Select({ children, className = '', variant, type, label, ...props }: Props) {
  const labelClassList = ['label-space-between', 'label-full-width', 'label-stack'];
  const classes = generateClasses(className, variant ? variant.filter((v) => !labelClassList.includes(v)) : [], 'select');
  
  let labelClass = [];
  if (variant) {
    if (variant.includes('label-space-between')) {
      labelClass.push('input--label-space-between');
    }
    if (variant.includes('label-full-width')) {
      labelClass.push('input--label-full-width');
    }
    if (variant.includes('label-stack')) {
      labelClass.push('input--label-stack');
    }
  }

  return (
    <label className={labelClass.join(' ')}>
      { label }
      <select
        {...parseClasses(classes)}
        {...props}
      >
        { children }
      </select>
    </label>
  );
}
