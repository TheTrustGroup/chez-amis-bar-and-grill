import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendHtmlEmail } from '@/lib/services/email.service'

const bodySchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }
    const { email } = parsed.data
    const adminEmail = process.env.ADMIN_EMAIL || 'chez@chezamisrestaurant.com'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://chezamisrestaurant.com'

    const confirmHtml = `
      <div style="font-family: Georgia, serif; color: #1a1a1a; line-height: 1.6;">
        <h1 style="color: #8B1A2C;">Welcome to the Chez Amis family</h1>
        <p>Thank you for subscribing. You’ll be the first to hear about seasonal menus, private dining, and special evenings at Chez Amis.</p>
        <p><a href="${siteUrl}">${siteUrl}</a></p>
      </div>
    `

    const adminHtml = `
      <p><strong>New newsletter signup:</strong> ${email}</p>
      <p>Time: ${new Date().toISOString()}</p>
    `

    await sendHtmlEmail({
      to: email,
      subject: 'Welcome to Chez Amis',
      html: confirmHtml,
    })

    await sendHtmlEmail({
      to: adminEmail,
      subject: `Newsletter signup: ${email}`,
      html: adminHtml,
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Newsletter error:', e)
    return NextResponse.json({ error: 'Could not subscribe' }, { status: 500 })
  }
}
