<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Task;
class ApiController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function tasks()
    {
        return response()->json($this->get_tasks());
    }

    public function create(Request $request)
    {
        $this->validate($request,[
            'title' => 'required|string',
            'description' => 'required'
        ]);
        $task = new Task([
            'title' => $request->title,
            'description' => $request->description,
            'status' => 0
        ]);
        $task->save();
        return response()->json([
            'status' => 'Success',
            'message' => 'Successfully created task!'
        ], 201);
    }

    public function edit(Request $request)
    {
        $task = Task::where('id', $request->id)->first();
        return response()->json($task);
    }

    public function update(Request $request)
    {
        $this->validate($request,[
            'title' => 'required|string',
            'description' => 'required'
        ]);
        Task::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);
        return response()->json([
            'status' => 'Success',
            'message' => 'Successfully updated task!',
            'data' => Task::where('id', $request->id)->first()
        ], 201);
    }
    
    public function status(Request $request)
    {
        $status = Task::where('id', $request->id)->pluck('status');
        Task::where('id', $request->id)->update([
            'status' => ($status[0] == 0)? 1 : 0
        ]);
        return response()->json([
            'status' => 'Success',
            'message' => 'Successfully updated status!',
            'data'    => $this->get_tasks()
        ], 201);
    }

    public function delete(Request $request)
    {
        Task::where('id', $request->id)->delete();
        return response()->json([
            'status' => 'Success',
            'message' => 'Successfully deleted task!',
            'data'    => $this->get_tasks()
        ], 201);
    }

    public function get_tasks(){
        return Task::orderby('id', 'desc')->get();
    }
}
