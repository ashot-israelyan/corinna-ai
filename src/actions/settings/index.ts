'use server';

import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { client } from "@/lib/prisma";

export const onGetSubscriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) return;

    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (plan) {
      return plan.subscription?.plan;
    }
  } catch (error) {
    console.error(error);
  }
};

export const onGetAllAccountDomains = async () => {
  const user = await currentUser();
  if (!user) return redirectToSignIn();

  try {
    const domains = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return domains;
  } catch (error) {
    console.error(error);
  }
}
