import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CornerLeftDown,
  CornerRightDown,
  MapPin,
  Navigation,
  RotateCcw,
} from 'lucide-react';

export function getDirectionIcon(text: string) {
  const t = text.toLowerCase();

  if (t.includes('turn right'))
    return <ArrowRight className='mr-1 inline h-4 w-4' />;
  if (t.includes('turn left'))
    return <ArrowLeft className='mr-1 inline h-4 w-4' />;
  if (t.includes('keep right'))
    return <CornerRightDown className='mr-1 inline h-4 w-4' />;
  if (t.includes('keep left'))
    return <CornerLeftDown className='mr-1 inline h-4 w-4' />;
  if (t.includes('roundabout'))
    return <RotateCcw className='mr-1 inline h-4 w-4' />;
  if (t.includes('arrive')) return <MapPin className='mr-1 inline h-4 w-4' />;
  if (t.includes('head north'))
    return <ArrowUp className='mr-1 inline h-4 w-4' />;
  if (t.includes('head south'))
    return <ArrowDown className='mr-1 inline h-4 w-4' />;
  if (t.includes('head east'))
    return <ArrowDownRight className='mr-1 inline h-4 w-4' />;
  if (t.includes('head west'))
    return <ArrowDownLeft className='mr-1 inline h-4 w-4' />;

  return <Navigation className='mr-1 inline h-4 w-4' />;
}
