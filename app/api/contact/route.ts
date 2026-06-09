import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENT = 'mara.azwa@gmail.com'
const FROM      = 'onboarding@resend.dev' 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 560px; margin: 0 auto; padding: 32px; background: #f4efe4; border: 2px solid #171717;">
          <div style="background: linear-gradient(180deg, #1084d0, #0a246a); padding: 8px 12px; margin-bottom: 24px;">
            <span style="color: #fff; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">NEW-MESSAGE.EXE — contact form</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 6px 0; color: #666; font-size: 11px; width: 80px;">FROM:</td>
              <td style="padding: 6px 0; font-size: 12px; font-weight: 700;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #666; font-size: 11px;">EMAIL:</td>
              <td style="padding: 6px 0; font-size: 12px;">
                <a href="mailto:${email}" style="color: #0a246a;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #666; font-size: 11px;">SUBJECT:</td>
              <td style="padding: 6px 0; font-size: 12px; font-weight: 700;">${subject}</td>
            </tr>
          </table>

          <div style="border-top: 2px solid #171717; padding-top: 20px;">
            <p style="color: #666; font-size: 10px; letter-spacing: 1px; margin-bottom: 10px;">MESSAGE:</p>
            <p style="font-size: 13px; line-height: 1.8; color: #171717; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="border-top: 1px solid #ccc; margin-top: 24px; padding-top: 12px; font-size: 10px; color: #999;">
            Sent via mara.azwa portfolio contact form
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('[Resend error]', error)
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[Contact API error]', err)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}

// Block non-POST methods
export function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}