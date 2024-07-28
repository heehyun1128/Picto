import Header from '@/components/shared/Header'
import { transformationTypes } from '@/constants'
import TransformationForm from '@/components/shared/TransformationForm'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getUser } from '@/lib/actions/user.actions'


const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in');
  const user = await getUser(userId);

  return (
   <>
   <Header
      title={transformation.title}
      subtitle={transformation.subTitle}
   />
    <TransformationForm action="Add" userId={user._id} type={transformation.type as TransformationTypeKey}
    creditBalance={user.creditBalance}
    />``
   </>
  )
}

export default AddTransformationTypePage