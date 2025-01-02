<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class GraphMock
    Inherits System.Windows.Forms.Form

    'フォームがコンポーネントの一覧をクリーンアップするために dispose をオーバーライドします。
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Windows フォーム デザイナーで必要です。
    Private components As System.ComponentModel.IContainer

    'メモ: 以下のプロシージャは Windows フォーム デザイナーで必要です。
    'Windows フォーム デザイナーを使用して変更できます。  
    'コード エディターを使って変更しないでください。
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        PlotView1 = New OxyPlot.WindowsForms.PlotView()
        SuspendLayout()
        ' 
        ' PlotView1
        ' 
        PlotView1.Location = New Point(12, 12)
        PlotView1.Name = "PlotView1"
        PlotView1.PanCursor = Cursors.Hand
        PlotView1.Size = New Size(776, 426)
        PlotView1.TabIndex = 0
        PlotView1.Text = "PlotView1"
        PlotView1.ZoomHorizontalCursor = Cursors.SizeWE
        PlotView1.ZoomRectangleCursor = Cursors.SizeNWSE
        PlotView1.ZoomVerticalCursor = Cursors.SizeNS
        ' 
        ' Graph
        ' 
        AutoScaleDimensions = New SizeF(7F, 15F)
        AutoScaleMode = AutoScaleMode.Font
        ClientSize = New Size(800, 450)
        Controls.Add(PlotView1)
        Name = "Graph"
        Text = "Graph"
        ResumeLayout(False)
    End Sub

    Friend WithEvents PlotView1 As OxyPlot.WindowsForms.PlotView
End Class
