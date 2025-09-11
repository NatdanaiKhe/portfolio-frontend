function Tag({ name }: { name: string }) {
  return (
    <div className="w-fit rounded-xl bg-blue-900 px-3 py-1 text-sm">{name}</div>
  );
}

export default Tag;
