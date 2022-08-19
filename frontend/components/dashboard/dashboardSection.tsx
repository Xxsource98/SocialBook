import React from 'react'
import classNames from 'classnames'

type SectionType = {
    backgroundColor?: string
    marginBottom?: number
    className?: string
    children: React.ReactNode

    inDashboard?: boolean
    noShadow?: boolean
    dashboardBackground?: boolean
}

const Section = React.forwardRef<HTMLDivElement, SectionType>(({ children, className, marginBottom, backgroundColor, dashboardBackground, inDashboard, noShadow }, ref) => {
    if (dashboardBackground) {
        return (
            <div ref={ref} className={classNames('relative', 'flex', 'flex-col', 'gap-3', 'w-full', 'lg:p-3', 'rounded-lg', 'lg:shadow-md', backgroundColor ? [`md:${backgroundColor}`, `dark:md:${backgroundColor}`] : ['lg:bg-slate-200', 'lg:dark:bg-gray-700'], className ?? '')} style={{ marginBottom: marginBottom }}>
                {children}
            </div>
        )
    }

    const bgColor = inDashboard ? ['bg-slate-100', 'dark:bg-gray-600'] : backgroundColor ?? ['bg-slate-200', 'dark:bg-gray-700']

    return (
        <div ref={ref} className={classNames('relative', 'w-full', 'p-3', 'rounded-lg', noShadow ? 'shadow-none' : 'shadow-md', bgColor, className ?? '')} style={{ marginBottom: marginBottom }}>
            {children}
        </div>
    )
})
Section.displayName = 'Section'

export default Section
