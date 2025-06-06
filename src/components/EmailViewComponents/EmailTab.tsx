import { Link, useLocation } from "react-router-dom"
import { Calendar } from "lucide-react"
import type { IEmail } from "@/types/generic"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

interface EmailTabProps {
  email: IEmail
}

export function EmailTab({ email }: EmailTabProps) {
  const { pathname } = useLocation()

  const isInboxPage = useMemo(() => pathname === "/mail", [pathname])
  const isOutboxPage = useMemo(() => pathname === "/mail/sent", [pathname])

  return (
    <Link
      to={`/mail/${isInboxPage ? "inbox" : "sent"}/${email.id}`}
      className="block w-full"
    >
      <div
        className={cn(
          "group relative flex flex-col gap-1 border-b p-4 transition-all hover:bg-gray-50 sm:flex-row sm:items-center sm:gap-4",
          !email.isRead && "bg-gray-50"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src="/images/avatar.png"
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
            {!email.isRead && (
              <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-blue-500" />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                "truncate text-sm text-gray-600",
                !email.isRead && "font-medium text-gray-900"
              )}
            >
              {isInboxPage && email.sender.suimailNs}
              {isOutboxPage && email.recipient.suimailNs}
            </p>
            <div className="flex items-center gap-2">
              <time
                className="flex items-center whitespace-nowrap text-xs text-gray-400"
                dateTime={email.createdAt}
              >
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(email.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
          <h3
            className={cn(
              "line-clamp-1 text-sm text-gray-600",
              !email.isRead && "font-medium text-gray-900"
            )}
          >
            {email.subject}
          </h3>
        </div>
      </div>
    </Link>
  )
}
