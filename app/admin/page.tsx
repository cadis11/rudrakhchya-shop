import { bucketName } from '@/lib/s3'

export default function AdminHome() {
  return (
    <main className="container space-y-4 py-6">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <div className="text-sm text-neutral-600">Demo portal. Wire up authentication + upload forms in production.</div>
      <div className="card p-4">
        <div>Storage bucket: <b>{bucketName() || 'Not configured (demo uses /public)'}</b></div>
      </div>
    </main>
  )
}
