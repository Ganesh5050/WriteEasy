import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Basic skeleton components
export const SkeletonText = ({ className = "h-4 w-full" }: { className?: string }) => (
  <Skeleton className={className} />
);

export const SkeletonAvatar = ({ size = "w-10 h-10" }: { size?: string }) => (
  <Skeleton className={`${size} rounded-full`} />
);

export const SkeletonButton = ({ className = "h-10 w-20" }: { className?: string }) => (
  <Skeleton className={className} />
);

// Card skeletons
export const CardSkeleton = () => (
  <Card>
    <CardHeader>
      <SkeletonText className="h-6 w-3/4" />
      <SkeletonText className="h-4 w-1/2" />
    </CardHeader>
    <CardContent className="space-y-3">
      <SkeletonText />
      <SkeletonText />
      <SkeletonText className="h-4 w-2/3" />
    </CardContent>
  </Card>
);

// Navigation skeleton
export const NavigationSkeleton = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md border-b border-gray-800">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SkeletonAvatar size="w-8 h-8" />
          <SkeletonText className="h-6 w-24" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonText key={i} className="h-4 w-16" />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <SkeletonButton className="h-8 w-16" />
          <SkeletonButton className="h-8 w-24" />
          <SkeletonAvatar size="w-8 h-8" />
        </div>
      </div>
    </div>
  </nav>
);

// Dashboard skeleton
export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText className="h-8 w-64 mb-2" />
          <SkeletonText className="h-4 w-96" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Table skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="flex gap-4">
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonText key={i} className="h-4 w-24" />
      ))}
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <SkeletonText key={colIndex} className="h-4 w-20" />
        ))}
      </div>
    ))}
  </div>
);

// List skeleton
export const ListSkeleton = ({ items = 5 }: { items?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <SkeletonText className="h-4 w-3/4" />
          <SkeletonText className="h-3 w-1/2" />
        </div>
        <SkeletonButton className="h-8 w-16" />
      </div>
    ))}
  </div>
);

// Code editor skeleton
export const CodeEditorSkeleton = () => (
  <div className="border rounded-lg overflow-hidden">
    <div className="bg-muted p-3 flex items-center gap-2">
      <SkeletonText className="h-4 w-16" />
      <SkeletonText className="h-4 w-20" />
      <SkeletonText className="h-4 w-12" />
    </div>
    <div className="p-4 space-y-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonText key={i} className="h-4 w-full" />
      ))}
    </div>
  </div>
);

// Form skeleton
export const FormSkeleton = ({ fields = 4 }: { fields?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <SkeletonText className="h-4 w-24" />
        <SkeletonText className="h-10 w-full" />
      </div>
    ))}
    <div className="flex gap-3">
      <SkeletonButton className="h-10 w-20" />
      <SkeletonButton className="h-10 w-24" />
    </div>
  </div>
);

// Chart skeleton
export const ChartSkeleton = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <SkeletonText className="h-6 w-32" />
      <SkeletonButton className="h-8 w-16" />
    </div>
    <div className="h-64 bg-muted rounded-lg flex items-end justify-between p-4">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="bg-background rounded-t w-8" style={{ height: `${Math.random() * 200 + 50}px` }} />
      ))}
    </div>
    <div className="flex justify-between">
      {Array.from({ length: 7 }).map((_, i) => (
        <SkeletonText key={i} className="h-3 w-8" />
      ))}
    </div>
  </div>
);

// Notification skeleton
export const NotificationSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-start gap-3 p-4 border rounded-lg">
        <SkeletonAvatar size="w-6 h-6" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <SkeletonText className="h-4 w-48" />
            <SkeletonText className="h-3 w-12" />
          </div>
          <SkeletonText className="h-3 w-full" />
          <SkeletonText className="h-3 w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

// Activity feed skeleton
export const ActivitySkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
        <SkeletonAvatar size="w-8 h-8" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <SkeletonText className="h-4 w-32" />
            <SkeletonText className="h-3 w-16" />
          </div>
          <SkeletonText className="h-3 w-full" />
          <SkeletonText className="h-3 w-3/4" />
          <div className="flex items-center gap-4">
            <SkeletonText className="h-3 w-20" />
            <SkeletonText className="h-3 w-16" />
            <SkeletonText className="h-3 w-24" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Loading overlay
export const LoadingOverlay = ({ message = "Loading..." }: { message?: string }) => (
  <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-background border rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  </div>
);

// Page loading skeleton
export const PageSkeleton = () => (
  <div className="min-h-screen bg-background">
    <NavigationSkeleton />
    <div className="pt-20">
      <DashboardSkeleton />
    </div>
  </div>
);
